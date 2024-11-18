"use client";

import Headers from "@/components/Headers";

type Props = {
  title?: string;
};

function ComposeHeader({ title }: Props) {
  return <Headers appendClassName="pt-16 bg-gray3 pb-20" title={title} back={{ historyBack: true }} thumb={{ display: false }} more={{ display: true, onClick: () => {} }} />;
}

export default ComposeHeader;
