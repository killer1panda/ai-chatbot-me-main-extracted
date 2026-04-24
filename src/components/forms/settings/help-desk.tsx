'use client'
import React from 'react'
import { useHelpDesk } from '@/hooks/settings/use-settings'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import Section from '@/components/section-label'
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loader'
import Accordion from '@/components/accordian'

type Props = {
  id: string
}

const HelpDesk = ({ id }: Props) => {
  const { register, errors, onSubmitQuestion, isQuestions, loading } =
    useHelpDesk(id)

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
        <div className="p-6 border-r-[1px] overflow-y-auto">
          <h3 className="font-bold text-lg mb-6">Help Desk</h3>
          <form
            onSubmit={onSubmitQuestion}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <Section
                label="Question"
                message="Add a question that you believe is frequently asked."
              />
              <FormGenerator
                inputType="input"
                register={register}
                errors={errors}
                form="help-desk-form"
                name="question"
                placeholder="Type your question"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Section
                label="Answer to question"
                message="The answer for the question above."
              />
              <FormGenerator
                inputType="textarea"
                register={register}
                errors={errors}
                name="answer"
                form="help-desk-form"
                placeholder="Type your answer"
                type="text"
                lines={5}
              />
            </div>
            <Button
              type="submit"
              className="bg-orange hover:bg-orange hover:opacity-70 transition duration-150 ease-in-out text-white font-semibold w-full"
            >
              <Loader loading={loading}>Create</Loader>
            </Button>
          </form>
        </div>
        <div className="p-6 overflow-y-auto bg-gray-50">
          <h3 className="font-bold text-lg mb-6">Questions</h3>
          <Loader loading={loading}>
            {isQuestions.length ? (
              isQuestions.map((question) => (
                <Accordion
                  key={question.id}
                  trigger={question.question}
                  content={question.answer}
                />
              ))
            ) : (
              <p className="text-gray-500">No Questions to show</p>
            )}
          </Loader>
        </div>
      </div>
    </div>
  )
}

export default HelpDesk