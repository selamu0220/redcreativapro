import React from 'react';
import { SvgViewer } from "../ui/svg/SvgViewer";
import AppLayout from './AppLayout';

export default function SvgViewerPage() {
  return (
    <AppLayout>
      <SvgViewer />
    </AppLayout>
  );
}
