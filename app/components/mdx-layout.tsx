interface MDXLayoutProps {
  children: React.ReactNode
}

export default function MDXLayout({ children }: MDXLayoutProps) {
  return <div className="mdx-content">{children}</div>
} 