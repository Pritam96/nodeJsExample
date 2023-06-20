exports.getContactUs = (req, res, next) => {
  // rendering contact-us.ejs file
  res.render('contact-us', {
    pageTitle: 'Contact Us',
    path: '/contactus',
  });
};

exports.getContactSuccess = (req, res, next) => {
  // rendering contact-success.ejs file
  res.render('contact-success', {
    pageTitle: 'Contact Us',
    path: '/contactus',
  });
};
