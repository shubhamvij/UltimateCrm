/**
 * Created by jackzhang on 6/26/17.
 */
const opportunity = [
    {
        'id': '1',
        'name': 'Jack',
        'description': 'Distributor',
        'company_id': '1',
        'currency': 'CAD',
        'expected_close_date': '2017/3/10',
        'approximate_worth': "test",
        'probability': "0.8",
        'next_steps': "Test",
        'notes': "test",
        'account_manager_id': "2",
        'strategies': [
            {
                "est_lifetime_value": 0,
                "notes": "Customer value will soon be 0 or negative.",
                "next_steps": "Cease sales and marketing efforts on the customer.",
                "stage": "Termination"
            }
        ]
    },
    {
        'id': '2',
        'name': 'John',
        'description': 'Individual',
        'company_id': '1',
        'currency': 'CAD',
        'expected_close_date': '2017/3/10',
        'approximate_worth': "test",
        'probability': "0.8",
        'next_steps': "Test",
        'notes': "test",
        'account_manager_id': "2",
        'strategies': [
            {
                'id': '1',
                'stage': 'Retention',
                'method': 'Up-sell and cross-sell'
            }
        ]
    }

]

export default opportunity;

