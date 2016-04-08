var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
  title: {type:String, required:'{PATH} is required!'},
  featured: {type:Boolean, required:'{PATH} is required'},
  published: {type:Date, required:'{PATH} is required'},
  host: String,
  tags: [String]
});

var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses() {
  Course.find({}).exec(function (err, collection) {
    if (collection.length === 0) {
      Course.create({title: 'Introduction to MongoDB using the MEAN stack', featured: true, published: new Date('11/16/2016'), host: "EdX", tags:["Web Development"]}),
      Course.create({title: 'Library Advocacy Unshushed', featured: true, published: new Date('3/23/2015'), host: "EdX", tags: ["Science", "Library Science"]}),
      Course.create({title: 'Introduction to Galois Theory', featured: true, published: new Date('3/21/2016'), host: "Coursera", tags:["Mathematics", "Anaylitical Philosophy"]}),
      Course.create({title: 'Introduction to Biology - The Secret of Life', featured: false, published: new Date('3/31/2016'), host: "EdX", tags: ["Biology", "Science"]}),
      Course.create({title: 'Mastering the Software Engineering Interview', featured: true, published: new Date('2/8/2016'), host: "Coursera", tags: ["Computer Programming", "Software Engineering", "Computer Science", "Science"]}),
      Course.create({title: 'English Grammar and Essay Writing', featured: false, published: new Date('2/16/2016'), host: "EdX", tags:["Language", "English"]}),
      Course.create({title: 'Anthropology of Current World Issues', featured: false, published: new Date('5/11/2015'), host: "EdX", tags:["Science", "Sociology", "Anthropology"]}),
      Course.create({title: 'Fundamentals of Audio and Music Engineering: Part 1 Musical Sound & Electronics', featured: true, published: new Date('3/31/2016'), host: "Coursera", tags:["Music", "Sound Design", "Sound Engineering"]}),
      Course.create({title: 'Tibetan Buddhist Meditation and the Modern World: Lesser Vehicle', featured: false, published: new Date('3/31/2016'), host: "Coursera", tags:["Psychology", "Theology", "Religious Studies"]}),
      Course.create({title: 'Bitcoin and Cryptocurrency Technologies', featured: false, published: new Date('3/31/2016'), host: "Coursera", tags:["Mathematics", "Economics", "Bitcoin", "Cryptocurrency", "Computer Science"]}),
      Course.create({title: 'American Government', featured: true, published: new Date('11/16/2016'), host: "EdX", tags:["Law", "Politics", "America", "Government"]}),
      Course.create({title: 'Combinatorial Mathematics', featured: false, published: new Date('1/11/2016'), host: "EdX", tags:["Mathematics", "Analytic Philosophy"]})
    }
  })
}

exports.createDefaultCourses = createDefaultCourses;
