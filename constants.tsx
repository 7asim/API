import { 
  Globe, 
  Server, 
  Database, 
  Zap, 
  RefreshCw, 
  ShieldCheck, 
  FileJson, 
  Link, 
  Layers
} from 'lucide-react';
import { ApiType, HttpMethod, StatusCodeGroup, BestPractice } from './types';

export const API_TYPES: ApiType[] = [
  {
    title: "REST",
    description: "The standard for web APIs. Uses HTTP & JSON.",
    icon: Globe,
    color: "text-blue-400",
    details: ["Resource-focused", "Standard HTTP methods", "Stateless"]
  },
  {
    title: "GraphQL",
    description: "Client specifies exactly what data it needs.",
    icon: Database,
    color: "text-pink-400",
    details: ["Single endpoint", "Avoids over-fetching", "Flexible queries"]
  },
  {
    title: "Websockets",
    description: "Bi-directional, real-time communication.",
    icon: Zap,
    color: "text-yellow-400",
    details: ["Persistent connection", "Live updates", "Chat apps"]
  },
  {
    title: "gRPC",
    description: "High-performance, uses Protocol Buffers.",
    icon: Server,
    color: "text-green-400",
    details: ["Binary serialization", "Microservices", "Efficient"]
  },
  {
    title: "SOAP",
    description: "Older, XML-based enterprise protocol.",
    icon: Layers,
    color: "text-gray-400",
    details: ["Strict standards", "Enterprise legacy", "Verbose XML"]
  }
];

export const HTTP_METHODS: HttpMethod[] = [
  {
    name: "GET",
    description: "Retrieve data from a resource.",
    action: "Read",
    color: "bg-blue-500",
    example: "/users/123",
    idempotent: true
  },
  {
    name: "POST",
    description: "Create a new resource.",
    action: "Create",
    color: "bg-green-500",
    example: "/users",
    idempotent: false
  },
  {
    name: "PUT",
    description: "Update or replace a resource entirely.",
    action: "Update",
    color: "bg-orange-500",
    example: "/users/123",
    idempotent: true
  },
  {
    name: "PATCH",
    description: "Partially update a resource.",
    action: "Modify",
    color: "bg-yellow-500",
    example: "/users/123",
    idempotent: false
  },
  {
    name: "DELETE",
    description: "Remove a resource.",
    action: "Remove",
    color: "bg-red-500",
    example: "/users/123",
    idempotent: true
  }
];

export const STATUS_CODES: StatusCodeGroup[] = [
  {
    range: "2xx",
    name: "Success",
    description: "The request was received and processed successfully.",
    color: "text-green-400",
    examples: [
      { code: 200, meaning: "OK - Request succeeded" },
      { code: 201, meaning: "Created - Resource created (POST)" },
      { code: 204, meaning: "No Content - Action done, no body returned" }
    ]
  },
  {
    range: "3xx",
    name: "Redirection",
    description: "Further action must be taken to complete the request.",
    color: "text-blue-400",
    examples: [
      { code: 304, meaning: "Not Modified - Cached version is still valid" }
    ]
  },
  {
    range: "4xx",
    name: "Client Error",
    description: "The request contains bad syntax or cannot be fulfilled.",
    color: "text-yellow-400",
    examples: [
      { code: 400, meaning: "Bad Request - Invalid syntax/params" },
      { code: 401, meaning: "Unauthorized - Authentication required" },
      { code: 403, meaning: "Forbidden - Authenticated but not allowed" },
      { code: 404, meaning: "Not Found - Resource doesn't exist" }
    ]
  },
  {
    range: "5xx",
    name: "Server Error",
    description: "The server failed to fulfill an apparently valid request.",
    color: "text-red-400",
    examples: [
      { code: 500, meaning: "Internal Server Error" },
      { code: 503, meaning: "Service Unavailable" }
    ]
  }
];

export const BEST_PRACTICES: BestPractice[] = [
  {
    title: "Consistent Naming",
    description: "Use plural nouns (e.g., /users, /posts). Use consistent casing (camelCase or snake_case) for fields.",
    icon: RefreshCw
  },
  {
    title: "Security First",
    description: "Never put sensitive data in URLs. Use HTTPS (TLS). Authenticate via Headers (Tokens), not query params.",
    icon: ShieldCheck
  },
  {
    title: "Versioning",
    description: "Always version your API (e.g., /api/v1/...) to manage changes without breaking existing clients.",
    icon: Link
  },
  {
    title: "JSON Everywhere",
    description: "Use JSON as the standard payload format. It's lightweight and human-readable.",
    icon: FileJson
  }
];
