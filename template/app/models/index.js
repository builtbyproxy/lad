const Jobs = require('mongoose-model-agenda');
const Queue = require('bull');

const { email } = require('../../jobs/email');

const bullJobs = new Queue('Email Service', {redis: {port: 6379, host: '127.0.0.1'}}); // Specify Redis connection using object
// Jobs.add(email)

bullJobs.process(function(job, done){
    console.log('Received A Job: ', job,'\n\n\n AND \n\n\nReceived A Callback: ', done);
    method.send(job);
    // email.send(job.attrs.data);
    // job.data contains the custom data passed when the job was created
    // job.id contains id of this job.
  
    // transcode video asynchronously and report progress
    // job.progress(42);
  
    // call done when finished
    // done();
  
    // or give a error if error
    // done(new Error('error transcoding'));
  
    // or pass it a result
    // done(null, { framerate: 29.5 /* etc... */ });
  
    // If the job throws an unhandled exception it is also handled correctly
    throw new Error('some unexpected error');
});

const createJob = (data) => {
    bullJobs.add(data, email);
}

const Users = require('./user');
const Inquiries = require('./inquiry');

module.exports = { Users, Inquiries, Jobs, createJob };
