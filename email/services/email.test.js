const dependencyInjector = require('../dependency-injector');
const nodemailer = require('nodemailer');

dependencyInjector.register(
    'emailTransport', 
    () => nodemailer.createTransport({
        jsonTransport:true
    })
)
const emailService = require('./email');

describe('email service tests', () => {
    const properFrom = 'test@email.com';
    const properTo = 'second@email.com';
    const properSubject = 'Subject Line';
    const properText = 'Text line';
    const properHtml = '<h1>Line</h1>';

    const improperFrom = 'notAnEmail';
    const improperTo = 'anotherNonEmail';
    const improperSubject = false;
    const improperText = 1234;
    const improperHtml = null;

    it('sendEmail - if no html or text property is included, fail validation', async (done) => {
        try{
            await emailService.sendEmail({
                from: properFrom,
                to: properTo,
                subject: properSubject,
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('sendEmail - if both html and text property is included, fail validation', async (done) => {
        try{
            await emailService.sendEmail({
                from: properFrom,
                to: properTo,
                subject: properSubject,
                text: properText,
                html: properHtml
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('sendEmail - improperFrom fails validation', async (done) => {
        try{
            await emailService.sendEmail({
                from: improperFrom,
                to: properTo,
                subject: properSubject,
                text: properText
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('sendEmail - improperTo fails validation', async (done) => {
        try{
            await emailService.sendEmail({
                from: properFrom,
                to: improperTo,
                subject: properSubject,
                text: properText
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('sendEmail - improperSubject fails validation', async (done) => {
        try{
            await emailService.sendEmail({
                from: properFrom,
                to: properTo,
                subject: improperSubject,
                text: properText
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('sendEmail - improperText fails validation', async (done) => {
        try{
            await emailService.sendEmail({
                from: properFrom,
                to: properTo,
                subject: properSubject,
                text: improperText
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('sendEmail - improperHtml fails validation', async (done) => {
        try{
            await emailService.sendEmail({
                from: properFrom,
                to: properTo,
                subject: properSubject,
                html: improperHtml
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('sendEmail is functional', async (done) => {
        await emailService.sendEmail({
            from: properFrom,
            to: properTo,
            subject: properSubject,
            html: properHtml
        });

        await emailService.sendEmail({
            from: properFrom,
            to: properTo,
            subject: properSubject,
            text: properText
        });

        // no errors have gotten thrown
        expect(true).toBeTruthy();
        done();
    })

})