function isDev() {
    return process.env.NODE_ENV == 'development'
}

async function fakeStream(sender) {
    const chunks = [
        "Hola ",
        "esto ",
        "es ",
        "una ",
        "prueba ",
        "de ",
        "streaming."
    ]

    for (const chunk of chunks) {
        sender.send(
            "v0-stream-chunk",
            new TextEncoder().encode(chunk)
        )

        await new Promise(resolve =>
            setTimeout(resolve, 500)
        )
    }

    sender.send("v0-stream-end")
}

exports.isDev = isDev
exports.fakeStream = fakeStream
