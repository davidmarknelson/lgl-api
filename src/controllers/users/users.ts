import User from '../../models/user';

function get(req, res) {
  User.findOne({ username: req.params.username })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(404).json({ resource: 'users', message: 'User does not exist!' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

function create(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: 'Please provide a username and password.' });
  } else {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      dietRestrictions: req.body.dietRestrictions,
      dietPreferences: req.body.dietPreferences
    });

    user.save()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        if (err.message === 'User validation failed') {
          res.status(400).json({ message: 'User validation failed.' });
        } else if (err.message === 'This user already exists!') {
          res.status(400).json({ message: 'This user already exists!' });
        } else {
          res.status(500).json(err);
        }
      });
  }
}

export default { get, create };
