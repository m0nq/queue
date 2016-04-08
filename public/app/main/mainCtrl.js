angular.module('app').controller('mainCtrl', function ($scope) {
  // bind course api data
  /* sample data */
  $scope.courses = [
    {name: 'Introduction to MongoDB using the MEAN stack', featured: true, published: new Date('11/16/2016'), host: "EdX"},
    {name: 'Library Advocacy Unshushed', featured: true, published: new Date('3/23/2015'), host: "EdX"},
    {name: 'Introduction to Galois Theory', featured: true, published: new Date('3/21/2016'), host: "Coursera"},
    {name: 'Introduction to Biology - The Secret of Life', featured: false, published: new Date('3/31/2016'), host: "EdX"},
    {name: 'Mastering the Software Engineering Interview', featured: true, published: new Date('2/8/2016'), host: "Coursera"},
    {name: 'English Grammar and Essay Writing', featured: false, published: new Date('2/16/2016'), host: "EdX"},
    {name: 'Anthropology of Current World Issues', featured: false, published: new Date('5/11/2015'), host: "EdX"},
    {name: 'Fundamentals of Audio and Music Engineering: Part 1 Musical Sound & Electronics', featured: true, published: new Date('3/31/2016'), host: "Coursera"},
    {name: 'Tibetan Buddhist Meditation and the Modern World: Lesser Vehicle', featured: false, published: new Date('3/31/2016'), host: "Coursera"},
    {name: 'Bitcoin and Cryptocurrency Technologies', featured: false, published: new Date('3/31/2016'), host: "Coursera"},
    {name: 'American Government', featured: true, published: new Date('11/16/2016'), host: "EdX"},
    {name: 'Combinatorial Mathematics', featured: false, published: new Date('1/11/2016'), host: "EdX"}
  ];
});
