from typing import Any, Dict
import aiohttp

from app.services.base_service import BaseService

class GroupChatService(BaseService):
    async def get_group_chats(self) -> Dict[str, Any]:
        return await self._request('GET', '/group-chats')

    async def get_group_chat(self, chat_id: int) -> Dict[str, Any]:
        return await self._request('GET', f'/group-chats/{chat_id}')

    async def create_group_chat(self, group_chat_data: Dict[str, Any]) -> Dict[str, Any]:
        return await self._request('POST', '/group-chats/create', json=group_chat_data)
