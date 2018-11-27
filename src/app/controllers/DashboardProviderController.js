const moment = require('moment')
const { Op } = require('sequelize')
const { User, Appointment } = require('../models')

class DashboardProviderController {
  async index (req, res) {
    const { id } = req.session.user
    const users = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      where: {
        provider_id: id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      }
    })
    return res.render('dashboardProvider', { users })
  }
}

module.exports = new DashboardProviderController()
