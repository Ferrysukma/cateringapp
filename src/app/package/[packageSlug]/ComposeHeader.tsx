"use client";

import Headers from "@/components/Headers";

type Props = {
  title?: string;
};

function ComposeHeader({ title }: Props) {
  return <Headers appendClassName="pt-16 absolute z-30" title={title} back={{ historyBack: true }} thumb={{ display: true, onClick: () => {} }} more={{ display: true, onClick: () => {} }} />;
}

export default ComposeHeader;
