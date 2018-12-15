from __future__ import division, print_function
# coding=utf-8
import sys
import os

import random
import string

# Flask utils
from flask import Flask, redirect, url_for, request, render_template
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer

import subprocess

# Define a flask app
app = Flask(__name__)

def generateRand():
    letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
    return ''.join([random.choice(letters) for _ in range(5)])

@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['image']

        rand_name = generateRand()

        filename = rand_name + '.jpg'

        sec_filename = secure_filename(filename)
        # Save the file to ./uploads
        file_path = os.path.join('/mnt','s3', 'images', sec_filename)
        f.save(file_path)

        # cmd = 'python ../vrn-pytorch/vrn.py ' + rand_name
        # subprocess.Popen(cmd.split())

        # Process your result for human
        return render_template('setMessage.html', filename=filename, randname=rand_name)
    return None

@app.route('/addComment', methods=['POST'])
def addComment():
    message = request.form['message']
    rand_name = request.form['randname']
    url = rand_name  
    return render_template('shareModel.html', url=url)


@app.route('/message/<name>' ,methods=['GET'])
def message(name=None):
    obj_name = name + '.obj'
    if os.path.isfile(os.path.join('/mnt','s3', 'models', obj_name)):
        render_template('ar/index.html', model_name=name)
    else:
        render_template('ar/index.html')


if __name__ == '__main__':
    # app.run(port=5002, debug=True)
    # Serve the app with gevent
    http_server = WSGIServer(('', 5000), app)
    http_server.serve_forever()

