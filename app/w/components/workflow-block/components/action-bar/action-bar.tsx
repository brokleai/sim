import { Button } from '@/components/ui/button'
import { Trash2, Play, Circle, CircleOff, Copy } from 'lucide-react'
import { useWorkflowStore } from '@/stores/workflow/workflow-store'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface ActionBarProps {
  blockId: string
}

export function ActionBar({ blockId }: ActionBarProps) {
  const removeBlock = useWorkflowStore((state) => state.removeBlock)
  const toggleBlockEnabled = useWorkflowStore(
    (state) => state.toggleBlockEnabled
  )
  const duplicateBlock = useWorkflowStore((state) => state.duplicateBlock)
  const isEnabled = useWorkflowStore(
    (state) => state.blocks[blockId]?.enabled ?? true
  )

  return (
    <div className="absolute top-0 -right-20 flex flex-col items-center gap-2 p-2 bg-white rounded-md shadow-sm border border-gray-200 animate-in fade-in slide-in-from-left-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              isEnabled
                ? 'bg-[#7F2FFF] hover:bg-[#7F2FFF]/90'
                : 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
            )}
            size="sm"
            disabled={!isEnabled}
          >
            <Play fill="currentColor" className="!h-3.5 !w-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Run Block</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleBlockEnabled(blockId)}
            className="text-gray-500"
          >
            {isEnabled ? (
              <Circle className="h-4 w-4" />
            ) : (
              <CircleOff className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          {isEnabled ? 'Disable Block' : 'Enable Block'}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => duplicateBlock(blockId)}
            className="text-gray-500"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Duplicate Block</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeBlock(blockId)}
            className="text-gray-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Delete Block</TooltipContent>
      </Tooltip>
    </div>
  )
}
