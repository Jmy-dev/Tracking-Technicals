import Validator from "validator";
import isEmpty from "./isEmpty";


export const validateTaskInput = task => {


    let errors = {};

    task.customerdata.location            = !isEmpty(task.customerdata.location)            ? task.customerdata.location                                      : '';
    task.customerdata.customerName        = !isEmpty(task.customerdata.customerName)        ? task.customerdata.customerName                                  : '';
    task.customerdata.customerPhonenumber = !isEmpty(task.customerdata.customerPhonenumber) ? task.customerdata.customerPhonenumber                           : '';
    task.description                      = !isEmpty(task.description)                      ? task.description                                                : '';
    task.category                         = !isEmpty(task.category)                         ? task.category                                                   :'';
    task.date                             = !isEmpty(task.date)                             ? task.date                                                       :'';
    task.duration                         = !isEmpty(task.duration)                         ? task.duration                                                   :'';  


    if(!Validator.isEmpty(task.customerdata.location)) {
        errors.location = "Location field is required!";
    }

    if(!Validator.isEmpty(task.customerdata.customerName)) {
        errors.customerName = "customerName field is required!";
    }
    if(!Validator.isEmpty(task.customerdata.customerPhonenumber)) {
        errors.Phonenumber = "Phonenumber field is required!";
    }
    if(!Validator.isEmpty(task.category)) {
        errors.category = "category field is required!";
    }

    if(!Validator.isEmpty(task.description)) {
        errors.description = "description field is required!";
    }
    if(!Validator.isEmpty(task.duration)) {
        errors.duration = "duration field is required!";
    }
    if(!Validator.isEmpty(task.date)) {
        errors.date = "date field is required!";
    }


    return {
        errors ,
        isValid: isEmpty(errors)
    }
    
}