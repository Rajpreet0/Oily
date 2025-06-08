import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface TooltipComponentProps {
  content: string;
  children: React.ReactNode;
}

const TooltipComponent: React.FC<TooltipComponentProps> = ({content, children}) => {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}

export default TooltipComponent