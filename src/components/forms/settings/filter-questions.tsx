'use client'
import Section from '@/components/section-label'
import { useFilterQuestions } from '@/hooks/settings/use-settings'
import React from 'react'
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loader'

type Props = {
  id: string
}

const FilterQuestions = ({ id }: Props) => {
  const { register, errors, onAddFilterQuestions, isQuestions, loading } =
    useFilterQuestions(id)

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
        <div className="p-6 border-r-[1px] overflow-y-auto">
          <h3 className="font-bold text-lg mb-6">Bot Questions</h3>
          <form
            onSubmit={onAddFilterQuestions}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <Section
                label="Question"
                message="Add a question that you want your chatbot to ask"
              />
              <FormGenerator
                inputType="input"
                register={register}
                errors={errors}
                form="filter-questions-form"
                name="question"
                placeholder="Type your question"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Section
                label="Answer to question"
                message="The anwer for the question above"
              />
              <FormGenerator
                inputType="textarea"
                register={register}
                errors={errors}
                form="filter-questions-form"
                name="answer"
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
          <h3 className="font-bold text-lg mb-6">Bot Questions List</h3>
          <Loader loading={loading}>
            {isQuestions.length ? (
              isQuestions.map((question) => (
                <div
                  key={question.id}
                  className="mb-4 p-4 bg-white rounded-lg border"
                >
                  <p className="font-semibold text-sm">{question.question}</p>
                  <p className="text-xs text-gray-600 mt-2">{question.answered}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No Questions</p>
            )}
          </Loader>
        </div>
      </div>
    </div>
  )
}

export default FilterQuestions