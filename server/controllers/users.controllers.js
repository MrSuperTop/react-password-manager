import User from '../models/user.models.js';

export const getUserEmails = async (req, res) => {
  try {
    const data = await User.findById(req.user.id).distinct('credentials.email');

    res.json({
      emails: data
    });
  } catch (error) {
    res.status(500).json({
      message: 'Was\'t able to get emails for this user',
      error
    });
  }
};
