const getOrigins = () => {
    const originString = process.env.ALLOWED_ORIGINS

    let origins = originString?.split(', ')
    if (!origins) {
        origins = ['http://localhost:5173']
    }

    return origins;
}

const getMethods = () => {
    const methodString = process.env.ALLOWED_METHODS

    let methods = methodString?.split(', ')
    if (!methods) {
        methods = ['GET', 'POST']
    }

    return methods;
}

export { getOrigins, getMethods }
