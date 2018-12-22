# -*- coding: utf-8 -*-
from __future__ import division, print_function
import sys
import os

import random
import subprocess

# Flask utils
from flask import Flask, request, render_template, send_from_directory, abort
from werkzeug.utils import secure_filename

reload(sys)
sys.setdefaultencoding('utf-8')

# Define a flask app
app = Flask(__name__)


def generate_rand():
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

        rand_name = generate_rand()
        while():
            if not os.path.exists(os.path.join('/text', rand_name)):
                break
            rand_name = generate_rand()

        filename = rand_name + '.jpg'
        sec_filename = secure_filename(filename)
        # Save the file to ./uploads
        file_path = os.path.join('/images', sec_filename)
        f.save(file_path)

        cmd = 'python ../vrn-pytorch/vrn.py ' + rand_name
        subprocess.Popen(cmd.split())

        # Process your result for human
        return render_template('setMessage.html', filename=filename, randname=rand_name)
    abort(404)


@app.route('/addComment', methods=['POST'])
def add_comment():
    message_from = request.form['message']
    rand_name = request.form['randname']
    path = os.path.join('/text', rand_name)
    with open(path, 'w') as f:
        f.write(message_from)

    url = 'https://scanme.tokyo/message/' + rand_name 
    return render_template('shareModel.html', url=url)


@app.route('/message/<name>', methods=['GET'])
def message(name=None):
    if name is not None:
        # パスの作成
        message_path = os.path.join('/text', name)
        if not os.path.exists(message_path):
            abort(404)

        # メッセージの読み込み
        with open(message_path, 'w') as f:
            message = f.readline()

        # s3にモデルがあるか確認
        current_path = os.path.dirname(os.path.abspath(__file__))
        path = os.path.join(current_path, '../s3', name + '.obj')
        print(path)

        if os.path.isfile(path):
            return render_template('ar/index.html', model_name=name, message=message)
        else:
            return render_template('wait.html')
    else:
        abort(404)


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == '__main__':
    debug = bool(os.environ['DEBUG'])
    app.run(debug=debug)
