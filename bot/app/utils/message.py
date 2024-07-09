from pyrogram.types import Message, CallbackQuery, InlineKeyboardMarkup
from pyrogram import Client
from pyrogram.errors.exceptions.bad_request_400 import MessageNotModified

async def message_operation(
    app: Client,
    event: CallbackQuery | Message, 
    text: str, 
    markup: InlineKeyboardMarkup = None
) -> Message:
    try:
        if isinstance(event, CallbackQuery):
            mess = await event.edit_message_text(text, reply_markup=markup)
            await event.answer()
        elif isinstance(event, Message):
            mess = await app.send_message(event.chat.id, text, reply_markup=markup)
    except MessageNotModified:
        mess = event.message if isinstance(event, CallbackQuery) else event
    
    return mess

async def answer_operation(
    app: Client,
    event: CallbackQuery | Message, 
    text: str, 
    markup: InlineKeyboardMarkup = None
) -> Message:
    if isinstance(event, CallbackQuery):
        mess = await event.answer(text)
    elif isinstance(event, Message):
        mess = await app.send_message(event.chat.id, f"{text}", reply_markup=markup)
    
    return mess

async def delete_message(
    event: CallbackQuery | Message,
) -> bool:
    if isinstance(event, CallbackQuery):
        success = await event.message.delete()
    elif isinstance(event, Message):
        success = await event.delete()
    
    return success
