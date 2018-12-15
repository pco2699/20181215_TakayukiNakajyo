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

        # 乱数を取得してファイル名にする
        filename = generateRand()

        # Save the file to ./uploads
        file_path = os.path.join('mnt','s3', 'images', secure_filename(filename))
        f.save(file_path)

        # Process your result for human
        return render_template('setMessage.html', filename=filename)
    return None

@app.route('/addComment', methods=['POST'])
def addComment():
    res.render_template('shareModel.html')


@app.route('/message/<name>' ,methods=['GET'])
def message(name=None):
    if os.path.isfile(os.path.join('mnt','s3', 'images', name) 
        res.render_template('ar/index.html', model_name=name)
    else
        res.render_template('ar/index.html')


if __name__ == '__main__':
    # app.run(port=5002, debug=True)
    # Serve the app with gevent
    http_server = WSGIServer(('', 5000), app)
    http_server.serve_forever()

