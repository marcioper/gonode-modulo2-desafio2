const { User } = require('../models')

class SessionController {
  create (req, res) {
    return res.render('auth/signin')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('Usuário não encontrado')
      req.flash('error', 'Usuário não encontrado')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('Senha incorreta')
      req.flash('error', 'Senha incorreta')
      return res.redirect('/')
    }

    req.session.user = user

    if (user.provider) {
      return res.redirect('/app/dashboardProvider')
    }

    return res.redirect('/app/dashboard')
  }
}

module.exports = new SessionController()
