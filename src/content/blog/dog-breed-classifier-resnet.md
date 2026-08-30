---
title: "A simple approach to a dog breed classifier with ResNet"
description: "Building a dog breed classifier with a CNN from scratch and transfer learning with ResNet-50 — plus a human look-alike detector."
pubDate: 2020-04-22
heroImage: /images/dog-breed-classifier.jpg
heroImageAlt: "sad looking Pug inside a blanket"
heroImageCredit: "Matthew Henry"
heroImageCreditUrl: "https://unsplash.com/@matthewhenry"
tags: ["deep learning", "cnn", "keras"]
---

> "The dog is a gentleman; I hope to go to his heaven not man's." — Mark Twain

There are many different dog breeds, and for some people it's hard to differentiate between, say, an [Alaskan Malamute and a Siberian Husky](https://www.akc.org/expert-advice/lifestyle/dog-breed-look-alikes/) — with over 340 breeds recognized by the [Fédération Cynologique Internationale](https://www.quora.com/How-many-breeds-of-dogs-exist).

That's why we want to use deep learning to create a classifier for this task. We'll use [Convolutional Neural Networks](https://cs231n.github.io/convolutional-networks/#overview) (CNNs), which make the assumption that the input is an image and that certain aspects of it are encoded by the network's architecture.

Besides creating a dog classifier, we'll also use it to classify human faces and their look-alike dog breed. The approach is structured into five simple steps.

## Step 1: Downloading and importing the dataset

The [first dataset](https://s3-us-west-1.amazonaws.com/udacity-aind/dog-project/lfw.zip) consists of 13,233 human images. The [second dataset](https://s3-us-west-1.amazonaws.com/udacity-aind/dog-project/dogImages.zip) consists of 8,351 dog images.

After downloading and unzipping both into your data folder, we create a function to load the dataset and build train, valid and test files plus targets:

```python
def load_dataset(path):
    data = load_files(path)
    dog_files = np.array(data['filenames'])
    dog_targets = np_utils.to_categorical(np.array(data['target']), 133)
    return dog_files, dog_targets

# load train, test, and validation datasets
train_files, train_targets = load_dataset('path/to/yourdata/dog_images/train')
valid_files, valid_targets = load_dataset('path/to/yourdata/dog_images/valid')
test_files, test_targets = load_dataset('path/to/yourdata/dog_images/test')
```

This gives us 6,680 training images, 835 validation images and 836 test images across 133 dog categories — an 80/10/10 split.

## Step 2: Face and dog detectors with OpenCV

OpenCV provides hundreds of computer vision algorithms. We use the OpenCV [Haar feature-based cascade classifiers](http://docs.opencv.org/trunk/d7/d8b/tutorial_py_face_detection.html) to detect human faces, with the pre-trained frontal face cascade from the [OpenCV repo](https://github.com/opencv/opencv/tree/master/data/haarcascades).

```python
import cv2

# extract pre-trained face detector
face_cascade = cv2.CascadeClassifier(
    'path_to_haarcascade_xml/haarcascade_frontalface_alt.xml'
)

# returns "True" if face is detected in image stored at img_path
def face_detector(img_path):
    img = cv2.imread(img_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray)
    return len(faces) > 0
```

For the dog detector we use ResNet-50, a pre-trained image classification model:

```python
from keras.applications.resnet50 import ResNet50

# define ResNet50 model
ResNet50_model = ResNet50(weights='imagenet')

def dog_detector(img_path):
    prediction = ResNet50_predict_labels(img_path)
    return ((prediction <= 268) & (prediction >= 151))
```

The dog detector outputs a label from the ResNet50 [dictionary](https://gist.github.com/yrevar/942d3a0ac09ec9e5eb3a); labels 151–268 are dog categories, from 'Border collie' up to 'Walker foxhound'.

## Step 3: A CNN from scratch

To get a better understanding of how a CNN works, we first create one from scratch. The first step is transforming our images into tensors:

```python
def path_to_tensor(img_path):
    # loads RGB image as PIL.Image.Image type
    img = image.load_img(img_path, target_size=(224, 224))
    # convert PIL.Image.Image type to 3D tensor with shape (224, 224, 3)
    x = image.img_to_array(img)
    # convert 3D tensor to 4D tensor with shape (1, 224, 224, 3)
    return np.expand_dims(x, axis=0)

def paths_to_tensor(img_paths):
    list_of_tensors = [path_to_tensor(img_path) for img_path in tqdm(img_paths)]
    return np.vstack(list_of_tensors)

# pre-process the data for Keras
train_tensors = paths_to_tensor(train_files).astype('float32')/255
valid_tensors = paths_to_tensor(valid_files).astype('float32')/255
test_tensors = paths_to_tensor(test_files).astype('float32')/255
```

Dividing by 255 scales the pictures. With preprocessing done, we create our CNN:

```python
model = Sequential()
model.add(Conv2D(filters=16, kernel_size=2,
                 input_shape=(224, 224, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=2, data_format='channels_last'))
model.add(Conv2D(filters=32, kernel_size=2, activation='relu'))
model.add(MaxPooling2D(pool_size=2, data_format='channels_last'))
model.add(Conv2D(filters=64, kernel_size=2, activation='relu'))
model.add(MaxPooling2D(pool_size=2, data_format='channels_last'))
model.add(GlobalAveragePooling2D())
model.compile(optimizer='rmsprop', loss='categorical_crossentropy',
              metrics=['accuracy'])
```

A very simple model: ReLU activations on each layer with MaxPooling, cross-entropy loss, rmsprop optimizer. Trained for 25 epochs, it reaches 1.19% accuracy — better than random guessing across 133 breeds, but that's about it.

## Step 4: Transfer learning with ResNet

1.19% accuracy isn't production-ready, so we use ResNet and optimize it on our image dataset:

```python
# Create the model
Resnet50_model = Sequential()
Resnet50_model.add(GlobalAveragePooling2D(
    input_shape=(train_ResNet_50.shape[1:])))
Resnet50_model.add(Dense(133, activation='softmax'))
Resnet50_model.summary()
```

Compile and train:

```python
Resnet50_model.compile(loss='categorical_crossentropy', optimizer='rmsprop')

checkpointer = ModelCheckpoint(
    filepath='saved_models/weights.best.Resnet50.hdf5',
    verbose=1, save_best_only=True)
Resnet50_model.fit(train_ResNet_50, train_targets,
                   validation_data=(valid_ResNet_50, valid_targets),
                   epochs=20, batch_size=20, callbacks=[checkpointer],
                   verbose=1)
```

After training and loading the best model we reach a **test accuracy of 81.56%**.

## Step 5: The dog identification app

```python
def dog_identification_app(img_path):
    display(Image(img_path, width=200, height=200))
    breed = resnet50_prediction_breed(img_path)
    if dog_detector(img_path):
        print("Hello, dog! You look like a {}\n".format(breed))
    elif face_detector(img_path):
        print("Hello, human! You look like a {}\n".format(breed))
    else:
        print("Uhmmm you are not a dog or a human! "
              "Can you please try another picture? THANKS")
```

The input image is displayed first, then checked by the dog detector. If it's neither a dog nor a human:

> Uhmmm you are not a dog or a human! Can you please try another picture? THANKS

## Conclusion and outlook

Training a CNN from scratch can be done in minutes to hours but likely won't satisfy our needs. For most use cases — like a dog classifier — transfer learning is enough.

This was a fun project: building a CNN from scratch and then a Keras architecture on top of it for the actual classifier. It performs well when the parameters are right and the breed is in the classifier.

Some possible improvements:

- The input image needs to show the front of a face; other face detection XMLs from OpenCV could improve this
- Better preprocessing with transformers
- Options for other look-alike animals (cats, etc.)
- A simple web app with Flask

There's also an approach with PyTorch and a more complex architecture [in my GitHub repo](https://github.com/Lukas-Forst/DeepLearning/tree/master/DogBreed%20Classification).

All steps are in the [project repository](https://github.com/Lukas-Forst/CapStoneProject-DogClassifier). Both datasets are from [Udacity](https://www.udacity.com/).

Thanks for reading!

Cover image by [Matthew Henry](https://unsplash.com/@matthewhenry) on [Unsplash](https://unsplash.com).