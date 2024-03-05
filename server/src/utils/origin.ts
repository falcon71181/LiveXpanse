const getOrigins = () => {
    const origins_string = process.env.ALLOWED_ORIGIN

    let origins = origins_string?.split(', ')
    if (!origins) {
        origins = ['http://localhost:5173']
    }

    return origins;
}

export { getOrigins }
