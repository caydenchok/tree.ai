import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Auth
      "Welcome Back": "Welcome Back",
      "Continue your learning journey": "Continue your learning journey",
      "Join Tree8 Global": "Join Tree8 Global",
      "Start your learning journey today": "Start your learning journey today",
      "Student": "Student",
      "Teacher": "Teacher",
      "Full Name": "Full Name",
      "Email": "Email",
      "Password": "Password",
      "Confirm Password": "Confirm Password",
      "Enter your full name": "Enter your full name",
      "Enter your email": "Enter your email",
      "Create a password": "Create a password",
      "Confirm your password": "Confirm your password",
      "Register as Student": "Register as Student",
      "Register as Teacher": "Register as Teacher",
      "Already have an account?": "Already have an account?",
      "Login here": "Login here",
      "Don't have an account?": "Don't have an account?",
      "Register here": "Register here",
      "Login as Student": "Login as Student",
      "Login as Teacher": "Login as Teacher",
      "Language": "Language",
      "Error": "Error",
      "Passwords do not match": "Passwords do not match",
      "Registration Successful": "Registration Successful",
      "Welcome to Tree8 Global!": "Welcome to Tree8 Global!",
      "Registration Failed": "Registration Failed",
      "An error occurred": "An error occurred"
    }
  },
  ms: {
    translation: {
      // Auth
      "Welcome Back": "Selamat Kembali",
      "Continue your learning journey": "Teruskan perjalanan pembelajaran anda",
      "Join Tree8 Global": "Sertai Tree8 Global",
      "Start your learning journey today": "Mulakan perjalanan pembelajaran anda hari ini",
      "Student": "Pelajar",
      "Teacher": "Guru",
      "Full Name": "Nama Penuh",
      "Email": "Emel",
      "Password": "Kata Laluan",
      "Confirm Password": "Sahkan Kata Laluan",
      "Enter your full name": "Masukkan nama penuh anda",
      "Enter your email": "Masukkan emel anda",
      "Create a password": "Cipta kata laluan",
      "Confirm your password": "Sahkan kata laluan anda",
      "Register as Student": "Daftar sebagai Pelajar",
      "Register as Teacher": "Daftar sebagai Guru",
      "Already have an account?": "Sudah mempunyai akaun?",
      "Login here": "Log masuk di sini",
      "Don't have an account?": "Tidak mempunyai akaun?",
      "Register here": "Daftar di sini",
      "Login as Student": "Log masuk sebagai Pelajar",
      "Login as Teacher": "Log masuk sebagai Guru",
      "Language": "Bahasa",
      "Error": "Ralat",
      "Passwords do not match": "Kata laluan tidak sepadan",
      "Registration Successful": "Pendaftaran Berjaya",
      "Welcome to Tree8 Global!": "Selamat datang ke Tree8 Global!",
      "Registration Failed": "Pendaftaran Gagal",
      "An error occurred": "Ralat telah berlaku"
    }
  },
  zh: {
    translation: {
      // Auth
      "Welcome Back": "欢迎回来",
      "Continue your learning journey": "继续您的学习之旅",
      "Join Tree8 Global": "加入Tree8 Global",
      "Start your learning journey today": "今天开始您的学习之旅",
      "Student": "学生",
      "Teacher": "老师",
      "Full Name": "全名",
      "Email": "电子邮件",
      "Password": "密码",
      "Confirm Password": "确认密码",
      "Enter your full name": "输入您的全名",
      "Enter your email": "输入您的电子邮件",
      "Create a password": "创建密码",
      "Confirm your password": "确认您的密码",
      "Register as Student": "注册为学生",
      "Register as Teacher": "注册为老师",
      "Already have an account?": "已有帐户？",
      "Login here": "在此登录",
      "Don't have an account?": "没有帐户？",
      "Register here": "在此注册",
      "Login as Student": "以学生身份登录",
      "Login as Teacher": "以老师身份登录",
      "Language": "语言",
      "Error": "错误",
      "Passwords do not match": "密码不匹配",
      "Registration Successful": "注册成功",
      "Welcome to Tree8 Global!": "欢迎加入Tree8 Global！",
      "Registration Failed": "注册失败",
      "An error occurred": "发生错误"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: ['en', 'ms', 'zh'],
  })
  .catch(err => console.error('Error loading translations:', err));

export default i18n;
