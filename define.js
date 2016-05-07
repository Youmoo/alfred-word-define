#! /usr/local/bin/node

const _ = require('pipeable');

const data = process.argv[2];

_(data)
    ._pi(JSON.parse)
    ._pi(json=> [{key: '音标', value: json.basic['us-phonetic']}].concat(json.translation, json.basic.explains, json.web))
    .map((v, i, a)=> {
        return typeof v === 'string' ? {
            title: v,
            subtitle: ''
        } : {
            title: v.value,
            subtitle: v.key
        }
    }).map((v)=> v && `
                <item>
                    <title><![CDATA[${v.title}]]></title>
                    <subtitle><![CDATA[${v.subtitle}]]></subtitle>
                </item>
            `
)._pi(items=> {
    console.log(`
                 <?xml version="1.0" encoding="UTF-8"?>
            <items>
                ${items.join()}
            </items>
            `)
});




