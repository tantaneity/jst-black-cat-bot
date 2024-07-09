import re
import time

from pyrogram import types, filters
from app import settings


user_id_to_state: dict[int:dict] = {}
"""example: {tg_id: {send_message_to_subscribers}}"""


def status_answer(*, tg_id: int) -> bool:
    exists = user_id_to_state.get(tg_id)
    if exists:
        return True
    return False


def is_status_answer(_, __, msg: types.Message) -> bool:
    """Check if user status is answer now"""
    tg_id = msg.from_user.id
    return status_answer(tg_id=tg_id)


def add_listener(*, tg_id: int, data: dict):
    """
    ```
    example: {1234567: {send_message_to_subscribers}}
    ```"""
    user_id_to_state.update({tg_id: data})


def remove_listener(*, tg_id: int):
    try:
        user_id_to_state.pop(tg_id)
    except KeyError:
        pass


def remove_listener_by_wa_id(*, tg_id: int):
    try:
        user_id_to_state.pop(tg_id)
    except KeyError:
        pass


def regex_start(arg: str):
    return filters.regex(rf"^/start ({arg})")


def check_username(text) -> str | None:
    """
    Check if is a username
    """
    username_regex = r"(?:@|t\.me\/|https:\/\/t\.me\/)([a-zA-Z][a-zA-Z0-9_]{2,})"

    match = re.search(username_regex, text)
    if match:
        return match.group(1)
    else:
        return None


def is_username(_, __, msg: types.Message) -> bool:
    return check_username(msg.text) is not None


list_of_media_group = []


async def is_media_group_exists_filter(_, __, msg: types.Message | types.CallbackQuery) -> bool:
    media_group = msg.media_group_id if isinstance(msg, types.Message) else msg.message.media_group_id
    
    if media_group not in list_of_media_group:
        list_of_media_group.append(media_group)
        return True
    list_of_media_group.remove(media_group)
    return False


last_message_time = {}


async def is_spamming(tg_id: int, msg: types.Message) -> bool:
    """
    Check if the user is spamming
    """

    current_time = time.time()

    user_messages = last_message_time.get(tg_id, [])

    user_messages = [
        timestamp for timestamp in user_messages if current_time - timestamp <= 1.5
    ]

    user_messages.append(current_time)
    last_message_time[tg_id] = user_messages
    if not len(user_messages) < int(settings.LIMIT_SPAM):
        await msg.delete()
    return len(user_messages) < int(settings.LIMIT_SPAM)


async def is_user_spamming(_, __, msg: types.Message) -> bool:
    tg_id = msg.from_user.id
    return await is_spamming(tg_id, msg)


last_callback_time = {}

def is_callback_spamming(tg_id: int) -> bool:
    """
    Check if the user is spamming callback queries
    """
    current_time = time.time()

    user_callbacks = last_callback_time.get(tg_id, [])

    user_callbacks = [
        timestamp for timestamp in user_callbacks if current_time - timestamp <= 1.5
    ]

    user_callbacks.append(current_time)
    last_callback_time[tg_id] = user_callbacks

    return len(user_callbacks) >= int(settings.LIMIT_SPAM)

def is_user_spamming_callback(_, __, callback_query: types.CallbackQuery) -> bool:
    tg_id = callback_query.from_user.id
    return is_callback_spamming(tg_id)