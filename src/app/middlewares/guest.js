module.exports = (req, res, next) => {
  if (req.session && !req.session.user) {
    return next()
  }

  const { provider } = req.session.user
  if (provider) {
    return res.redirect('/app/dashboardProvider')
  }

  return res.redirect('/app/dashboard')
}
