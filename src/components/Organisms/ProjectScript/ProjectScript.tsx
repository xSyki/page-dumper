'use client'

import { Project } from '@prisma/client'

import ProjectLayout from '@/components/Templates/ProjectLayout/ProjectLayout'

import ScriptEditor from './ScriptEditor/ScriptEditor'
import ScriptTestResults from './ScriptTestResults/ScriptTestResults'

interface IProjectScriptProps {
    project: Project
}

export default function ProjectScript(props: IProjectScriptProps) {
    const { project } = props

    return (
        <ProjectLayout projectId={project.id}>
            <div className="flex">
                <ScriptEditor project={project} />
                <ScriptTestResults project={project} />
            </div>
        </ProjectLayout>
    )
}
