/**
 * Created by jackzhang on 6/28/17.
 */
/**
 * Created by jackzhang on 6/26/17.
 */
var strategies = [
    {
        'id': 1,
        'stage': 'Acquisition',
        'notes': 'Loyalty Program. Online purchases.',
        'type': 'customer',
        'currency': 'CAD',
        'expected_close_date': '2017/3/10',
        'approximate_worth': "test",
        'probability': "0.8",
        'next_steps': "Test",
        'account_manager_id': "2",
        'strategies': [
            {
                'id': 1,
                "notes": "Use information to be better informed.",
                "next_steps": "Collect customer information.",
            }
        ]
    },
    {
        'id': 2,
        'stage': 'Retention',
        'notes': 'Repeat customers. High value customers.',
        'currency': 'CAD',
        'type': 'customer',
        'expected_close_date': '2017/3/10',
        'approximate_worth': "test",
        'probability': "0.8",
        'next_steps': "Test",
        'account_manager_id': "2",
        'strategies': [
            {
                'id': 1,
                "notes": "Build a stronger relationship.",
                "next_steps": "Customized event and produce care emails.",
            },
            {
                'id': 2,
                "notes": "Seek potential opportunities to buy and sell.",
                "next_steps": "Up-sell and cross-sell.",
            }
        ]
    },
    {
        'id': 3,
        'stage': 'Renewal',
        'notes': 'No response to retention strategies.',
        'currency': 'CAD',
        'type': 'customer',
        'expected_close_date': '2017/3/10',
        'approximate_worth': "test",
        'probability': "0.8",
        'next_steps': "Test",
        'account_manager_id': "2",
        'strategies': [
            {
                'id': 1,
                "notes": "Remind customers.",
                "next_steps": "Retention calls",
            },
            {
                'id': 2,
                "notes": "Gather information of what went wrong",
                "next_steps": "Retention surveys.",
            }
        ]
    },
    {
        'id': 4,
        'stage': 'Termination',
        'notes': 'No new orders come in for 6 consecutive quarters.',
        'currency': 'CAD',
        'type': 'customer',
        'expected_close_date': '2017/3/10',
        'approximate_worth': "test",
        'probability': "0.8",
        'next_steps': "Test",
        'account_manager_id': "2",
        'strategies': [
            {
                'id': 1,
                "notes": "Terminate gracefully.",
                "next_steps": "Documents of termination.",
            }

        ]
    }
]

export default strategies;


