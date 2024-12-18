import { ref } from 'vue'
import type { ChargePoint } from './types/ChargePoint.ts'

const ws_connect = function (item: ChargePoint) {
    item.socket = new WebSocket(item.backend_url + '/' + item.name)

    item.socket.addEventListener('open', (event: Event) => {
        item.connection_state_confirmed = ref('OPEN')
        item.connection_state_color = 'green'
        console.log(
            `charge point '${item.name}', connection opened, ${event}`,
        )
    })

    item.socket.addEventListener('close', (event: Event) => {
        item.connection_state_confirmed = ref('CLOSED')
        item.connection_state_color = 'grey'
        console.log(
            `charge point '${item.name}', connection closed, ${event}`,
        )
    })

    item.socket.addEventListener('error', (event: Event) => {
        item.connection_state_confirmed = ref('ERROR')
        item.connection_state_color = 'red'
        console.error(
            `charge point '${item.name}', connection error, ${event}`,
        )
    })

    item.socket.addEventListener('message', (event: Event) => {
        console.error(
            `charge point '${item.name}', message received, ${event}`,
        )
    })
}

export { ws_connect }
