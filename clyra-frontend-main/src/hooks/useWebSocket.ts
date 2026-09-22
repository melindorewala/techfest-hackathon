import { useState, useEffect, useRef } from 'react';

interface WebSocketMessage {
  type: 'question' | 'response';
  question?: string;
  response?: string;
}

export const useWebSocket = () => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const connect = (existingSessionId?: string) => {
    // Use existing session ID or generate a new one
    const newSessionId = existingSessionId || 'session_' + Math.random().toString(36).substr(2, 9);
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${wsProtocol}//localhost:8000/ws/${newSessionId}`;
    
    console.log('🔗 Connecting to WebSocket:', wsUrl, 'with sessionId:', newSessionId);
    
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('✅ WebSocket connected with sessionId:', newSessionId);
      setIsConnected(true);
      setSessionId(newSessionId);
      setWebsocket(ws);
      
      // Clear any pending reconnect
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
    
    ws.onmessage = (event) => {
      console.log('🎯 RAW WebSocket message received:', event.data);
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        console.log('🔥 PARSED WebSocket message:', data);
        
        if (data.type === 'question' && data.question) {
          console.log('✅ Setting currentQuestion to:', data.question);
          setCurrentQuestion(data.question);
        }
      } catch (error) {
        console.error('❌ Error parsing WebSocket message:', error);
      }
    };
    
    ws.onclose = () => {
      console.log('❌ WebSocket disconnected');
      setIsConnected(false);
      setWebsocket(null);
      
      // Attempt to reconnect after 3 seconds using the same session ID
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log('🔄 Attempting to reconnect with same sessionId:', newSessionId);
        connect(newSessionId);
      }, 3000);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return ws;
  };

  useEffect(() => {
    // Generate initial session ID and connect
    const initialSessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    console.log('🚀 Initial connection with sessionId:', initialSessionId);
    setSessionId(initialSessionId);
    const ws = connect(initialSessionId);

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const sendResponse = (response: string) => {
    if (websocket && isConnected && response.trim()) {
      console.log('Sending response:', response);
      websocket.send(JSON.stringify({
        type: 'response',
        response: response.trim()
      }));
      setCurrentQuestion(null);
      return true;
    }
    return false;
  };

  const clearQuestion = () => {
    setCurrentQuestion(null);
  };

  return {
    sessionId,
    isConnected,
    currentQuestion,
    sendResponse,
    clearQuestion,
    reconnect: connect
  };
};