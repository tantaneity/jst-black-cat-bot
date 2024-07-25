from typing import Any, Dict
import aiohttp

from app.services.base_service import BaseService

class GroupChatMessageService(BaseService):
    async def get_group_chat_messages(self) -> Dict[str, Any]:
        return await self._request('GET', '/group-chat-messages')

    async def get_group_chat_message(self, message_id: str) -> Dict[str, Any]:
        return await self._request('GET', f'/group-chat-messages/{message_id}')

    async def create_group_chat_message(self, group_chat_message_data: Dict[str, Any]) -> Dict[str, Any]:
        return await self._request('POST', '/group-chat-messages/create', json=group_chat_message_data)
