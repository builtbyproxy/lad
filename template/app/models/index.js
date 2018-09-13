const Jobs = require('mongoose-model-agenda');
const Queue = require('bull');

const { email } = require('../../jobs/email');

const bullJobs = new Queue('Email Service', {redis: {port: 6379, host: '127.0.0.1'}}); // Specify Redis connection using object

bullJobs.process(function(job, done){
    console.log('Received A Job: ', job,'\n\n\n AND \n\n\nReceived A Callback: ', done);
    email.send(job.attrs.data);

    // call done when finished
    done();

    // If the job throws an unhandled exception it is also handled correctly
    throw new Error('some unexpected error');
});

const createJob = (data) => {
    bullJobs.add(data, email);
}

const Users = require('./user');
const Inquiries = require('./inquiry');

module.exports = { Users, Inquiries, Jobs, createJob };
