import requests

def postMsg(msg, platform):
    """Post a message to a specified platform.

    Args:
        msg (str): The message to post
        platform (str): The platform to post the message ('pushover', 'facebook', 'twitter', 'linkedin')
    """
    if platform == 'pushover':
        url = 'https://api.pushover.net/1/messages.json'
        data = {'token': 'a6y9kxgj8pjnqjup9v5tqgvz5mu7qj', 'user': 'uq4tgj5p3q1vxp1xktd7hvj8d1h8qj', 'message': msg}
        requests.post(url, data)
    elif platform == 'facebook':
        url = 'https://graph.facebook.com/v11.0/me/feed'
        #TODO: get access token
        access_token = 'YOUR_ACCESS_TOKEN'
        data = {
            'message': msg,
            'access_token': access_token
        }
        response = requests.post(url, data)
        if response.status_code != 200:
            print("Failed to post to Facebook:", response.text)
        pass
    elif platform == 'twitter':
        url = 'https://api.twitter.com/1.1/statuses/update.json'
        #TODO: get access tokens
        auth = {
            'consumer_key': 'YOUR_CONSUMER_KEY',
            'consumer_secret': 'YOUR_CONSUMER_SECRET',
            'access_token_key': 'YOUR_ACCESS_TOKEN_KEY',
            'access_token_secret': 'YOUR_ACCESS_TOKEN_SECRET'
        }
        oauth = OAuth1(url, **auth)
        data = {'status': msg}
        response = requests.post(url, auth=oauth, data=data)
        if response.status_code != 200:
            print("Failed to post to Twitter:", response.text)
        pass
    elif platform == 'linkedin':
        url = 'https://api.linkedin.com/v2/ugcPosts'
        #TODO: get access tokens
        access_token = 'YOUR_ACCESS_TOKEN'
        auth = {
            'Authorization': f'Bearer {access_token}'
        }
        data = {
            'author': 'urn:li:person:1234567890',
            'lifecycleState': 'PUBLISHED',
            'specificContent': {
                'com.linkedin.ugc.Share': {
                    'shareCommentary': {
                        'text': msg
                    },
                    'shareMediaCategory': 'ARTICLE'
                }
            },
            'visibility': {
                'code': 'anyone'
            }
        }
        response = requests.post(url, headers=auth, json=data)
        if response.status_code != 201:
            print("Failed to post to LinkedIn:", response.text)
        pass
    else:
        print("Unsupported platform")

def job():
    """Post a message to a specified platform."""
    post = input("What would you like to post?")
    platform = input("Which platform would you like to post to? (pushover/facebook/twitter/linkedin)")
    postMsg(post, platform)
    print(f"Posted '{post}' to {platform}")

schedule.every(1).minutes.do(job) # it will post every 1 minute

while True:
    schedule.run_pending()
    time.sleep(1)