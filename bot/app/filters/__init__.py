from app.filters.filters import is_media_group_exists_filter, is_user_spamming
from pyrogram import filters

is_spamming_filter = filters.create(is_user_spamming)
is_media_group_exists = filters.create(is_media_group_exists_filter)