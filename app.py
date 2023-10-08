from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello Worldadsasdasdd!'

@app.route("/page1/<int:potato>")
def page1(potato):

    return str(potato)


if __name__ == '__main__':
    app.run()
