from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/skills')
def skills():
    return render_template('skills.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if username == 'admin' and password == 'password':
            flash('Login successful!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Invalid credentials, please try again.', 'error')
    
    return render_template('login.html')

tasks = []

@app.route('/add_task', methods=['POST'])
def add_task():
    task = request.form['task']
    if task:
        tasks.append(task)
        return jsonify({'tasks': tasks})
    return jsonify({'error': 'Task cannot be empty'})

@app.route('/delete_task', methods=['POST'])
def delete_task():
    task = request.form['task']
    if task in tasks:
        tasks.remove(task)
        return jsonify({'tasks': tasks})
    return jsonify({'error': 'Task not found'})

if __name__ == '__main__':
    app.run(debug=os.getenv('FLASK_DEBUG', False))


