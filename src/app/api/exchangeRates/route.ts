import axios from "axios";
import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";


export async function GET(){
    try {

        const url = process.env.NEXT_PUBLIC_API_ECB_URL;
        const response = await axios.get(url!);
        const xmlData = response.data;

        const result = await parseStringPromise(xmlData, {explicitArray: false});
        const items = result['rdf:RDF']['item'];

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No exchange rate data found.' }, { status: 404 });
        }

        const latestItem = Array.isArray(items) ? items[0] : items;

        const rateObj =
        latestItem?.['cb:statistics']?.['cb:exchangeRate']?.['cb:value'];

        const eurToUsd = rateObj
        ? parseFloat(rateObj._ || rateObj)
        : null;

        const usdToEur = eurToUsd
        ? parseFloat((1 / eurToUsd).toFixed(4))
        : null;



        return NextResponse.json({
            eurToUsd,
            usdToEur,
            date:  latestItem?.['dc:date'] || null,
        });
        
    } catch (error: any) {
        console.error('Error fetching exchange rate:', error);
        return NextResponse.json({
            error: "Failed to fetch exchange rate",
            message: error.message,
            details: error.response?.data ?? null
        }, {
            status: error.response?.status || 500
        })
    }
}
/*
<item rdf:about="http://www.ecb.europa.eu/stats/exchange/eurofxref/html/eurofxref-graph-usd.en.html?date=2025-06-06&amp;rate=1.1411">
    <title xml:lang="en">1.1411 USD = 1 EUR 2025-06-06 ECB Reference rate</title>
    <link>http://www.ecb.europa.eu/stats/exchange/eurofxref/html/eurofxref-graph-usd.en.html?date=2025-06-06&amp;rate=1.1411</link>
    <description xml:lang="en">1 EUR buys 1.1411 US dollar (USD) - The reference exchange rates are published both by electronic market information providers and on the ECB's website shortly after the concertation procedure has been completed. Reference rates are published according to the same  calendar as the TARGET system.</description>
    <dc:date>2025-06-06T14:15:00+01:00</dc:date>
    <dc:language>en</dc:language>
    <cb:statistics>
        <cb:country>U2</cb:country>
        <cb:institutionAbbrev>ECB</cb:institutionAbbrev>
        <cb:exchangeRate>
            <cb:value frequency="daily" decimals="4">1.1411</cb:value>
            <cb:baseCurrency unit_mult="0">EUR</cb:baseCurrency>
            <cb:targetCurrency>USD</cb:targetCurrency>
            <cb:rateType>Reference rate</cb:rateType>
        </cb:exchangeRate>
    </cb:statistics>
</item>
*/