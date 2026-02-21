/**
 * Hybrid WebView Bridge (Web ↔ Flutter)
 * 공통 계약: BridgeMessage 스키마 기반
 */

// ─── Types ───────────────────────────────────────────────────

export interface BridgeError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface BridgeMessage<P = unknown> {
  event: string;
  correlationId: string;
  payload?: P;
  error?: BridgeError;
}

// ─── Event 목록 ───────────────────────────────────────────────

export const BRIDGE_EVENTS = {
  // 시스템
  READY: "bridge.ready",
  ERROR: "bridge.error",

  // 인증 (Flutter → Web)
  AUTH_STATE_CHANGED: "auth.state_changed",

  // 카메라 / 파일 (Web → Flutter)
  CAMERA_OPEN: "camera.open",
  FILE_SELECT: "file.select",

  // 업로드 (Web → Flutter / Flutter → Web)
  UPLOAD_REQUEST: "upload.request",
  UPLOAD_PROGRESS: "upload.progress",
  UPLOAD_COMPLETED: "upload.completed",
  UPLOAD_FAILED: "upload.failed",

  // 파일 결과 (Flutter → Web)
  FILE_RESULT: "file.result",

  // 딥링크 (Flutter → Web)
  DEEP_LINK: "push.deep_link",
} as const;

// ─── Payload 타입 ─────────────────────────────────────────────

export interface AuthStatePayload {
  isLoggedIn: boolean;
  user?: { id: string; username: string };
}

export interface UploadRequestPayload {
  travelId: string;
  isSnapshot: boolean;
}

export interface UploadResultPayload {
  photoId: string;
  url: string;
}

export interface DeepLinkPayload {
  path: string; // e.g. "/post/123"
}

// ─── 유틸: correlationId 생성 ─────────────────────────────────

const uuid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

// ─── Web → Flutter 송신 ───────────────────────────────────────

export function sendToFlutter<P>(event: string, payload?: P): string {
  const correlationId = uuid();
  const msg: BridgeMessage<P> = { event, correlationId, payload };

  // flutter_inappwebview JS channel 또는 postMessage 방식 모두 지원
  const msgStr = JSON.stringify(msg);
  if (
    typeof window !== "undefined" &&
    (window as unknown as Record<string, unknown>).FlutterChannel
  ) {
    (
      (window as unknown as Record<string, { postMessage: (s: string) => void }>)
        .FlutterChannel
    ).postMessage(msgStr);
  } else if (
    typeof window !== "undefined" &&
    (window as unknown as Record<string, unknown>).ReactNativeWebView
  ) {
    (
      (
        window as unknown as Record<string, { postMessage: (s: string) => void }>
      ).ReactNativeWebView
    ).postMessage(msgStr);
  } else {
    // 개발 환경 로그
    console.debug("[Bridge → Flutter]", msg);
  }

  return correlationId;
}

// ─── Flutter → Web 수신 ───────────────────────────────────────

type BridgeHandler<P = unknown> = (msg: BridgeMessage<P>) => void;
const handlers = new Map<string, Set<BridgeHandler>>();

export function onBridgeEvent<P>(
  event: string,
  handler: BridgeHandler<P>
): () => void {
  if (!handlers.has(event)) handlers.set(event, new Set());
  handlers.get(event)!.add(handler as BridgeHandler);

  return () => {
    handlers.get(event)?.delete(handler as BridgeHandler);
  };
}

function dispatch(raw: string) {
  try {
    const msg: BridgeMessage = JSON.parse(raw);
    if (!msg.event) return;
    handlers.get(msg.event)?.forEach((h) => h(msg));
    handlers.get("*")?.forEach((h) => h(msg)); // 와일드카드
  } catch {
    console.warn("[Bridge] 파싱 실패:", raw);
  }
}

// window.message 리스너 등록 (Flutter WebView postMessage)
if (typeof window !== "undefined") {
  window.addEventListener("message", (e) => {
    if (typeof e.data === "string") dispatch(e.data);
  });

  // flutter_inappwebview 전역 핸들러 노출
  (window as unknown as Record<string, unknown>).handleFlutterMessage = dispatch;
}

// bridge.ready 알림 (페이지 로드 시 Flutter에게 준비 완료 전달)
export function notifyBridgeReady() {
  sendToFlutter(BRIDGE_EVENTS.READY, { version: "1.0" });
}
