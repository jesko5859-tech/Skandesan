// ==================== APP STATE ====================
const appState = {
    currentUser: null,
    isLoggedIn: false,
    currentPage: 'home',
    currentSlide: 0,
    schedule: [
        {
            id: 1,
            time: '9:00 AM - 10:00 AM',
            subject: 'Mathematics',
            topic: 'Algebra Basics',
            category: 'math'
        },
        {
            id: 2,
            time: '10:15 AM - 11:15 AM',
            subject: 'English',
            topic: 'Literature Analysis',
            category: 'english'
        },
        {
            id: 3,
            time: '11:30 AM - 12:30 PM',
            subject: 'Science',
            topic: 'Physics - Motion',
            category: 'science'
        },
        {
            id: 4,
            time: '2:00 PM - 3:00 PM',
            subject: 'History',
            topic: 'Ancient Civilizations',
            category: 'history'
        },
        {
            id: 5,
            time: '3:15 PM - 4:15 PM',
            subject: 'Biology',
            topic: 'Cell Structure',
            category: 'science'
        },
        {
            id: 6,
            time: '4:30 PM - 5:30 PM',
            subject: 'Geography',
            topic: 'World Capitals',
            category: 'history'
        }
    ],
    notes: [
        {
            id: 1,
            title: 'Quadratic Equations',
            content: 'A quadratic equation is a polynomial equation of the second degree. The general form is ax² + bx + c = 0, where a ≠ 0.',
            date: '2026-06-04',
            category: 'math',
            tags: ['algebra', 'equations']
        },
        {
            id: 2,
            title: 'Shakespeare Overview',
            content: 'William Shakespeare was an English playwright and poet who lived from 1564 to 1616. He is widely regarded as the greatest writer in the English language.',
            date: '2026-06-03',
            category: 'english',
            tags: ['literature', 'renaissance']
        },
        {
            id: 3,
            title: 'Newton\'s Laws of Motion',
            content: 'First Law: An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.',
            date: '2026-06-02',
            category: 'science',
            tags: ['physics', 'mechanics']
        }
    ],
    quizzes: [
        {
            id: 1,
            title: 'Algebra Basics',
            subject: 'Mathematics',
            questions: 10,
            difficulty: 'Beginner',
            attempts: 2,
            bestScore: 85,
            data: [
                {
                    id: 1,
                    question: 'What is the value of x in the equation 2x + 5 = 13?',
                    options: ['2', '3', '4', '5'],
                    correct: 2
                },
                {
                    id: 2,
                    question: 'Simplify: 3x² + 2x² - x²',
                    options: ['4x²', '5x²', '6x²', '4x'],
                    correct: 0
                },
                {
                    id: 3,
                    question: 'What is the slope of the line y = 2x + 3?',
                    options: ['1', '2', '3', '4'],
                    correct: 1
                }
            ]
        },
        {
            id: 2,
            title: 'English Literature',
            subject: 'English',
            questions: 8,
            difficulty: 'Intermediate',
            attempts: 1,
            bestScore: 75,
            data: [
                {
                    id: 1,
                    question: 'Who wrote "Romeo and Juliet"?',
                    options: ['Jane Austen', 'William Shakespeare', 'Mark Twain', 'Charles Dickens'],
                    correct: 1
                },
                {
                    id: 2,
                    question: 'What is the main theme of "To Kill a Mockingbird"?',
                    options: ['Revenge', 'Justice and Prejudice', 'Adventure', 'Mystery'],
                    correct: 1
                }
            ]
        }
    ]
};

// ==================== AUTHENTICATION ====================
function initApp() {
    const savedUser = localStorage.getItem('studyCoachUser');
    if (savedUser) {
        appState.currentUser = JSON.parse(savedUser);
        appState.isLoggedIn = true;
        showDashboard();
    } else {
        showLogin();
    }
}

function showLogin() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="login-container">
            <div class="login-wrapper">
                <div class="login-visual">
                    <div class="geometric-shape shape-circle"></div>
                    <div class="geometric-shape shape-square"></div>
                    <div class="geometric-shape shape-triangle"></div>
                    <div class="geometric-shape shape-pentagon"></div>
                    <div class="login-hero-text">
                        <h1>Study Coach</h1>
                        <p>Master your subjects with smart study schedules and interactive learning</p>
                        <div class="features-list">
                            <div class="feature-item">📅 Daily study schedule</div>
                            <div class="feature-item">⚡ Interactive quizzes</div>
                            <div class="feature-item">📝 Quick study notes</div>
                            <div class="feature-item">📊 Track progress</div>
                        </div>
                    </div>
                </div>
                <div class="login-form">
                    <h2>Welcome Back</h2>
                    <p>Sign in to continue your learning journey</p>
                    <form id="loginForm">
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" id="loginEmail" placeholder="you@example.com" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <div class="password-field">
                                <input type="password" id="loginPassword" placeholder="Enter your password" required>
                                <span class="toggle-password" onclick="togglePassword('loginPassword')">👁️</span>
                            </div>
                        </div>
                        <div class="form-options">
                            <div class="checkbox-group">
                                <input type="checkbox" id="rememberMe">
                                <label for="rememberMe">Remember me</label>
                            </div>
                            <a href="#">Forgot password?</a>
                        </div>
                        <button type="submit" class="btn-login">Sign In</button>
                    </form>
                    <div class="divider">OR</div>
                    <div class="social-buttons">
                        <button type="button" class="btn-social" onclick="handleSocialLogin('google')">🔵 Google</button>
                        <button type="button" class="btn-social" onclick="handleSocialLogin('github')">⬛ GitHub</button>
                    </div>
                    <div class="signup-link">
                        Don't have an account? <a onclick="showSignup(event)">Create one</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

function showSignup(e) {
    e.preventDefault();
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="login-container">
            <div class="login-wrapper">
                <div class="login-visual">
                    <div class="geometric-shape shape-circle"></div>
                    <div class="geometric-shape shape-square"></div>
                    <div class="geometric-shape shape-triangle"></div>
                    <div class="login-hero-text">
                        <h1>Join Study Coach</h1>
                        <p>Start your learning journey today</p>
                    </div>
                </div>
                <div class="login-form">
                    <h2>Create Account</h2>
                    <p>Sign up to get started with smart studying</p>
                    <form id="signupForm">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="signupName" placeholder="Your full name" required>
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" id="signupEmail" placeholder="you@example.com" required>
                        </div>
                        <div class="form-group">
                            <label>Grade/Level</label>
                            <select id="signupGrade" required>
                                <option value="">Select your grade</option>
                                <option value="9">Grade 9</option>
                                <option value="10">Grade 10</option>
                                <option value="11">Grade 11</option>
                                <option value="12">Grade 12</option>
                                <option value="college">College</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <div class="password-field">
                                <input type="password" id="signupPassword" placeholder="Create a strong password" required>
                                <span class="toggle-password" onclick="togglePassword('signupPassword')">👁️</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Confirm Password</label>
                            <div class="password-field">
                                <input type="password" id="signupConfirmPassword" placeholder="Confirm your password" required>
                                <span class="toggle-password" onclick="togglePassword('signupConfirmPassword')">👁️</span>
                            </div>
                        </div>
                        <div class="form-options">
                            <div class="checkbox-group">
                                <input type="checkbox" id="agreeTerms" required>
                                <label for="agreeTerms">I agree to Terms of Service</label>
                            </div>
                        </div>
                        <button type="submit" class="btn-login">Create Account</button>
                    </form>
                    <div class="signup-link">
                        Already have an account? <a onclick="showLogin()">Sign in</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('signupForm').addEventListener('submit', handleSignup);
}

function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    field.type = field.type === 'password' ? 'text' : 'password';
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email && password) {
        const user = {
            id: Date.now(),
            email: email,
            name: email.split('@')[0],
            joinDate: new Date().toLocaleDateString()
        };

        localStorage.setItem('studyCoachUser', JSON.stringify(user));
        appState.currentUser = user;
        appState.isLoggedIn = true;
        showDashboard();
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const grade = document.getElementById('signupGrade').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const user = {
        id: Date.now(),
        name: name,
        email: email,
        grade: grade,
        joinDate: new Date().toLocaleDateString()
    };

    localStorage.setItem('studyCoachUser', JSON.stringify(user));
    appState.currentUser = user;
    appState.isLoggedIn = true;
    showDashboard();
}

function handleSocialLogin(provider) {
    const user = {
        id: Date.now(),
        name: `${provider} User`,
        email: `user@${provider}.com`,
        joinDate: new Date().toLocaleDateString(),
        provider: provider
    };

    localStorage.setItem('studyCoachUser', JSON.stringify(user));
    appState.currentUser = user;
    appState.isLoggedIn = true;
    showDashboard();
}

// ==================== DASHBOARD ====================
function showDashboard() {
    const app = document.getElementById('app');
    const userInitial = appState.currentUser.name.charAt(0).toUpperCase();

    app.innerHTML = `
        <div class="dashboard-container">
            <aside class="sidebar">
                <div class="logo">📚 Study Coach</div>
                <ul class="nav-menu">
                    <li class="nav-item">
                        <div class="nav-link active" onclick="navigateTo('home')" data-page="home">🏠 Home</div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link" onclick="navigateTo('schedule')" data-page="schedule">📅 Schedule</div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link" onclick="navigateTo('notes')" data-page="notes">📝 Notes</div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link" onclick="navigateTo('quizzes')" data-page="quizzes">❓ Quizzes</div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link" onclick="navigateTo('progress')" data-page="progress">📊 Progress</div>
                    </li>
                </ul>
                <div style="margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border-color);">
                    <div class="nav-link" onclick="handleLogout()" style="color: var(--danger);">
                        🚪 Logout
                    </div>
                </div>
            </aside>

            <div class="main-content">
                <div class="top-bar">
                    <div class="search-bar">
                        <span>🔍</span>
                        <input type="text" placeholder="Search notes, quizzes...">
                    </div>
                    <div class="user-menu">
                        <div class="notification-icon">
                            🔔
                            <div class="notification-badge">3</div>
                        </div>
                        <div class="user-profile">
                            <div class="user-avatar">${userInitial}</div>
                            <span>${appState.currentUser.name}</span>
                        </div>
                    </div>
                </div>

                <div class="content-area">
                    <!-- HOME SECTION -->
                    <div id="home" class="section active">
                        <div class="section-title">Welcome back, ${appState.currentUser.name}! 👋</div>
                        
                        <!-- CAROUSEL SLIDER -->
                        <div class="carousel-container">
                            <div class="carousel-wrapper">
                                ${appState.schedule.map((item, idx) => `
                                    <div class="carousel-slide" style="display: ${idx === 0 ? 'flex' : 'none'};">
                                        <div class="carousel-decoration carousel-circle"></div>
                                        <div class="carousel-decoration carousel-square"></div>
                                        <div class="carousel-slide-content">
                                            <div class="carousel-slide-time">⏰ ${item.time}</div>
                                            <div class="carousel-slide-subject">${item.subject}</div>
                                            <div class="carousel-slide-topic">📖 ${item.topic}</div>
                                            <div class="carousel-slide-duration">⏱️ 1 hour</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            <button class="carousel-nav carousel-prev" onclick="previousSlide()">❮</button>
                            <button class="carousel-nav carousel-next" onclick="nextSlide()">❯</button>
                            <div class="carousel-controls">
                                ${appState.schedule.map((_, idx) => `
                                    <div class="carousel-dot ${idx === 0 ? 'active' : ''}" onclick="goToSlide(${idx})"></div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="dashboard-grid">
                            <div class="card stat-card">
                                <div class="stat-value">8/10</div>
                                <div class="stat-label">Today's Goal</div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 80%;"></div>
                                </div>
                            </div>
                            <div class="card stat-card">
                                <div class="stat-value">24</div>
                                <div class="stat-label">Study Hours</div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 60%;"></div>
                                </div>
                            </div>
                            <div class="card stat-card">
                                <div class="stat-value">3</div>
                                <div class="stat-label">Quizzes Done</div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 40%;"></div>
                                </div>
                            </div>
                            <div class="card stat-card">
                                <div class="stat-value">12</div>
                                <div class="stat-label">Notes Created</div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 75%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SCHEDULE SECTION -->
                    <div id="schedule" class="section">
                        <div class="section-title">Daily Practice Schedule</div>
                        <div class="timetable-header">
                            <div>
                                <label>Select Date:</label>
                                <input type="date" style="padding: 8px; border: 1px solid var(--border-color); border-radius: 6px;">
                            </div>
                            <button class="btn-add-schedule" onclick="openAddScheduleModal()">+ Add Schedule</button>
                        </div>
                        <div class="timetable-wrapper">
                            <table class="timetable">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Subject</th>
                                        <th>Topic</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${appState.schedule.map(item => `
                                        <tr>
                                            <td class="time-slot">${item.time}</td>
                                            <td><span class="subject-badge ${item.category}">${item.subject}</span></td>
                                            <td>${item.topic}</td>
                                            <td>
                                                <button class="icon-btn" onclick="editSchedule(${item.id})">✏️</button>
                                                <button class="icon-btn" onclick="deleteSchedule(${item.id})" style="color: var(--danger);">🗑️</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- NOTES SECTION -->
                    <div id="notes" class="section">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                            <div class="section-title" style="margin-bottom: 0;">My Study Notes</div>
                            <button class="btn-new-note" onclick="openNoteModal()">+ New Note</button>
                        </div>
                        <div class="notes-container">
                            ${appState.notes.map(note => `
                                <div class="note-card ${note.category}" onclick="viewNote(${note.id})">
                                    <div class="note-header">
                                        <div class="note-title">${note.title}</div>
                                        <div class="note-date">${new Date(note.date).toLocaleDateString()}</div>
                                    </div>
                                    <div class="note-content">${note.content}</div>
                                    <div class="note-footer">
                                        <div class="note-category">${note.category.toUpperCase()}</div>
                                        <div class="note-actions">
                                            <button class="icon-btn" onclick="editNote(${note.id}, event)" style="margin-right: 4px;">✏️</button>
                                            <button class="icon-btn" onclick="deleteNote(${note.id}, event)" style="color: var(--danger);">🗑️</button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- QUIZZES SECTION -->
                    <div id="quizzes" class="section">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                            <div class="section-title" style="margin-bottom: 0;">Available Quizzes</div>
                            <button class="btn-new-quiz" onclick="openQuizModal()">+ Create Quiz</button>
                        </div>
                        <div class="quiz-list">
                            ${appState.quizzes.map(quiz => `
                                <div class="quiz-card">
                                    <div class="quiz-header">
                                        <div class="quiz-title">${quiz.title}</div>
                                        <div class="quiz-questions">${quiz.questions} Questions</div>
                                    </div>
                                    <div class="quiz-body">
                                        <div class="quiz-meta">
                                            <div class="quiz-stat">
                                                <div class="quiz-stat-value">${quiz.difficulty}</div>
                                                <div class="quiz-stat-label">Difficulty</div>
                                            </div>
                                            <div class="quiz-stat">
                                                <div class="quiz-stat-value">${quiz.bestScore}%</div>
                                                <div class="quiz-stat-label">Best Score</div>
                                            </div>
                                        </div>
                                        <button class="btn-start-quiz" onclick="startQuiz(${quiz.id})">Start Quiz</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- PROGRESS SECTION -->
                    <div id="progress" class="section">
                        <div class="section-title">Learning Progress</div>
                        <div class="dashboard-grid">
                            <div class="card">
                                <div style="font-size: 20px; font-weight: 700; margin-bottom: 15px; color: var(--primary);">📈 Study Statistics</div>
                                <p>📚 Total Study Hours: <strong>24 hours</strong></p>
                                <p>📚 Quizzes Completed: <strong>3</strong></p>
                                <p>📚 Average Score: <strong>82%</strong></p>
                                <p>📚 Notes Created: <strong>12</strong></p>
                                <p>📚 Streak: <strong>7 days</strong></p>
                            </div>
                            <div class="card">
                                <div style="font-size: 20px; font-weight: 700; margin-bottom: 15px; color: var(--success);">🎯 Subject Performance</div>
                                <p>📖 Mathematics: <strong>85%</strong></p>
                                <p>📖 English: <strong>78%</strong></p>
                                <p>📖 Science: <strong>88%</strong></p>
                                <p>📖 History: <strong>75%</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODALS -->
        <div id="scheduleModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title">Add Schedule</div>
                    <button class="close-btn" onclick="closeModal('scheduleModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Subject</label>
                        <input type="text" placeholder="e.g., Mathematics" id="scheduleSubject">
                    </div>
                    <div class="form-group">
                        <label>Topic</label>
                        <input type="text" placeholder="e.g., Algebra" id="scheduleTopic">
                    </div>
                    <div class="form-group">
                        <label>Time</label>
                        <input type="text" placeholder="e.g., 9:00 AM - 10:00 AM" id="scheduleTime">
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select id="scheduleCategory">
                            <option value="math">Mathematics</option>
                            <option value="english">English</option>
                            <option value="science">Science</option>
                            <option value="history">History</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" onclick="closeModal('scheduleModal')">Cancel</button>
                    <button class="btn-save" onclick="saveSchedule()">Save Schedule</button>
                </div>
            </div>
        </div>

        <div id="noteModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title">Create Note</div>
                    <button class="close-btn" onclick="closeModal('noteModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" placeholder="Note title" id="noteTitle">
                    </div>
                    <div class="form-group">
                        <label>Content</label>
                        <textarea id="noteContent" placeholder="Write your notes here..." style="width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; min-height: 200px;"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select id="noteCategory">
                            <option value="math">Mathematics</option>
                            <option value="english">English</option>
                            <option value="science">Science</option>
                            <option value="history">History</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" onclick="closeModal('noteModal')">Cancel</button>
                    <button class="btn-save" onclick="saveNote()">Save Note</button>
                </div>
            </div>
        </div>
    `;

    updateActiveNav();
}

// ==================== CAROUSEL FUNCTIONS ====================
function nextSlide() {
    appState.currentSlide = (appState.currentSlide + 1) % appState.schedule.length;
    updateCarousel();
}

function previousSlide() {
    appState.currentSlide = (appState.currentSlide - 1 + appState.schedule.length) % appState.schedule.length;
    updateCarousel();
}

function goToSlide(index) {
    appState.currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    slides.forEach((slide, idx) => {
        slide.style.display = idx === appState.currentSlide ? 'flex' : 'none';
    });
    
    dots.forEach((dot, idx) => {
        if (idx === appState.currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// ==================== NAVIGATION ====================
function navigateTo(page) {
    appState.currentPage = page;
    appState.currentSlide = 0;
    
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    const section = document.getElementById(page);
    if (section) {
        section.classList.add('active');
    }
    
    updateActiveNav();
}

function updateActiveNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-page="${appState.currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// ==================== MODAL FUNCTIONS ====================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

function openAddScheduleModal() {
    openModal('scheduleModal');
}

function saveSchedule() {
    const subject = document.getElementById('scheduleSubject').value;
    const topic = document.getElementById('scheduleTopic').value;
    const time = document.getElementById('scheduleTime').value;
    const category = document.getElementById('scheduleCategory').value;

    if (subject && topic && time) {
        const newSchedule = {
            id: Date.now(),
            time,
            subject,
            topic,
            category
        };
        
        appState.schedule.push(newSchedule);
        closeModal('scheduleModal');
        showDashboard();
        navigateTo('schedule');
    }
}

function editSchedule(id) {
    console.log('Edit schedule:', id);
}

function deleteSchedule(id) {
    if (confirm('Delete this schedule?')) {
        appState.schedule = appState.schedule.filter(s => s.id !== id);
        showDashboard();
        navigateTo('schedule');
    }
}

// ==================== NOTE FUNCTIONS ====================
function openNoteModal() {
    openModal('noteModal');
}

function saveNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const category = document.getElementById('noteCategory').value;

    if (title && content) {
        const newNote = {
            id: Date.now(),
            title,
            content,
            date: new Date().toISOString().split('T')[0],
            category,
            tags: []
        };
        
        appState.notes.push(newNote);
        closeModal('noteModal');
        showDashboard();
        navigateTo('notes');
    }
}

function viewNote(id) {
    const note = appState.notes.find(n => n.id === id);
    if (note) {
        console.log('View note:', note);
    }
}

function editNote(id, event) {
    event.stopPropagation();
    console.log('Edit note:', id);
}

function deleteNote(id, event) {
    event.stopPropagation();
    if (confirm('Delete this note?')) {
        appState.notes = appState.notes.filter(n => n.id !== id);
        showDashboard();
        navigateTo('notes');
    }
}

// ==================== QUIZ FUNCTIONS ====================
function openQuizModal() {
    console.log('Open quiz creation modal');
}

function startQuiz(quizId) {
    const quiz = appState.quizzes.find(q => q.id === quizId);
    if (quiz) {
        showQuizView(quiz);
    }
}

function showQuizView(quiz) {
    const app = document.getElementById('app');
    const questionIndex = 0;
    const currentQuestion = quiz.data[questionIndex];

    app.innerHTML = `
        <div style="display: flex; height: 100vh; background: var(--bg-light);">
            <aside class="sidebar">
                <div class="logo">📚 Study Coach</div>
                <div class="nav-link" onclick="showDashboard()" style="margin-top: 20px;">← Back to Dashboard</div>
            </aside>
            <div class="main-content" style="width: 100%;">
                <div class="content-area" style="max-width: 900px; margin: 0 auto;">
                    <div class="quiz-container">
                        <div class="quiz-progress">
                            <div class="quiz-progress-fill" style="width: ${((questionIndex + 1) / quiz.data.length) * 100}%;"></div>
                        </div>
                        <div class="quiz-question-section">
                            <div class="quiz-question-number">Question ${questionIndex + 1} of ${quiz.data.length}</div>
                            <div class="quiz-question-text">${currentQuestion.question}</div>
                            <div class="quiz-options">
                                ${currentQuestion.options.map((option, idx) => `
                                    <label class="quiz-option">
                                        <input type="radio" name="answer" value="${idx}" onchange="selectOption(${idx})">
                                        ${option}
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                        <div class="quiz-nav-buttons">
                            <button class="btn-prev" onclick="previousQuestion()">← Previous</button>
                            <button class="btn-next" onclick="nextQuestion()">Next →</button>
                            ${questionIndex === quiz.data.length - 1 ? '<button class="btn-submit" onclick="submitQuiz()">Submit Quiz</button>' : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function previousQuestion() {
    console.log('Previous question');
}

function nextQuestion() {
    console.log('Next question');
}

function selectOption(idx) {
    console.log('Selected option:', idx);
}

function submitQuiz() {
    alert('Quiz submitted!');
    showDashboard();
}

// ==================== LOGOUT ====================
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('studyCoachUser');
        appState.isLoggedIn = false;
        appState.currentUser = null;
        showLogin();
    }
}

// ==================== INIT ====================
window.addEventListener('DOMContentLoaded', initApp);