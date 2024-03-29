import { useEffect, useState } from "react";

export default function CryptoList () {
    const [list, setList] = useState(null)

    useEffect(() => {
        
    })

    async function getCryptos() {
        let url = 'https://api.coincap.io/v2/assets'
        try {
            let requestOptions = {
                method: 'GET',
                redirect: 'follow',
                limit: 15
            }
            const response = fetch(url, requestOptions)
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div>test</div>
    )
}