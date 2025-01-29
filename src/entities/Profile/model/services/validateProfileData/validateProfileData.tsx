import { Profile, validateProfileError } from "../../types/profile";

export const validateProfileData = (profile?: Profile) => {
    if(!profile) {
        return [validateProfileError.NO_DATA]
    }

    const {first, age,country,lastname} = profile

    const errors: validateProfileError[] = []

    if(!first || !lastname){
        errors.push(validateProfileError.INCORRECT_USER_DATA)
    }
    if(!age || !Number.isInteger(age)){
        errors.push(validateProfileError.INCORRECT_AGE)
    }
    if(!country){
        errors.push(validateProfileError.INCORRECT_COUNTRY)
    }

    return errors
}