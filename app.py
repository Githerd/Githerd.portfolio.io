import os
from flask import Flask, render_template, redirect, url_for, flash, request, Blueprint
from flask_login import LoginManager, login_user, logout_user, UserMixin, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'yumyumsugar_1')

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth.login'

users = {}

class User(UserMixin):
    def __init__(self, id):
        self.id = id

    @staticmethod
    def get(user_id):
        return User(user_id) if user_id in users else None

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.about'))
    
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        stored_password = users.get(username)
        if stored_password and check_password_hash(stored_password, password):
            login_user(User(username))
            flash('Login successful!', 'success')
            return redirect(url_for('main.about'))
        flash('Invalid credentials, please try again.', 'error')
    return render_template('login.html')

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.about'))
    
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users:
            flash('Username already exists, please choose another one.', 'error')
        else:
            users[username] = generate_password_hash(password)
            flash('Registration successful! Please login.', 'success')
            return redirect(url_for('auth.login'))
    return render_template('register.html')

@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'success')
    return redirect(url_for('auth.login'))

app.register_blueprint(auth_bp)


main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def about():
    return render_template('about.html')

@main_bp.route('/skills')
def skills():
    return render_template('skills.html')

@main_bp.route('/projects')
def projects():
    return render_template('projects.html')

@main_bp.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
       
        flash('Your message has been sent successfully!', 'success')
        return redirect(url_for('main.balloon'))  
    return render_template('contact.html')

@main_bp.route('/balloon')
def balloon():
    return render_template('balloon.html')

app.register_blueprint(main_bp)


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)
