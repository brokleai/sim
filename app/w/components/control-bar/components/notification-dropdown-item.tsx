import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { AlertCircle, Copy, Key, Terminal, X } from 'lucide-react'
import { ErrorIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useNotificationStore } from '@/stores/notifications/store'
import {
  NotificationOptions,
  NotificationStore,
  NotificationType,
} from '@/stores/notifications/types'

interface NotificationDropdownItemProps {
  id: string
  type: NotificationType
  message: string
  timestamp: number
  options?: NotificationOptions
}

const NotificationIcon = {
  error: ErrorIcon,
  console: Terminal,
  api: Key,
}

const NotificationColors = {
  error: 'text-destructive',
  console: 'text-foreground',
  api: 'text-green-500',
}

export function NotificationDropdownItem({
  id,
  type,
  message,
  timestamp,
}: NotificationDropdownItemProps) {
  const { showNotification } = useNotificationStore()
  const Icon = NotificationIcon[type]
  const [, forceUpdate] = useState({})

  // Update the time display every minute
  useEffect(() => {
    const interval = setInterval(() => forceUpdate({}), 60000)
    return () => clearInterval(interval)
  }, [])

  const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true })

  return (
    <DropdownMenuItem
      className="flex items-start gap-2 p-3 cursor-pointer"
      onClick={() => showNotification(id)}
    >
      <Icon className={cn('h-4 w-4', NotificationColors[type])} />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">{type === 'error' ? 'Error' : 'Console'}</span>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>
        <p className="text-sm text-foreground">{message}</p>
      </div>
    </DropdownMenuItem>
  )
}
