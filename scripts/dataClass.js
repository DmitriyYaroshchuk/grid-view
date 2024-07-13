import {data} from "./data.js";

export const dataClass = {
    title: 'Таблица',
    titleClass: ['h1', 'text-center'],
    tableClass: ['table', 'table-dark'],
    attributes: {
        'company': {
            'label': 'Компания',
            'src': 'html'
        },
        'chef': {
            'label': 'Директор'
        },
        'country': {
            'label': 'Страна',
            'value': (data) => {
                if (data['country'] === 'Germany') {
                    return data['country'] + ' map';
                }
                return data['country'];
            }
        }
    },
    data: data,
    element: 'body'
}