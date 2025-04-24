import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { ErrorMessage } from "../../common/errorMessage/ErrorMessage";
import { Input } from "../../common/input/Input";
import { Button } from '../../common/button/Button';
import { UnsavedChangesModal } from '../../common/unsaved-changes-modal/UnsavedChangesModal';
import { PostFormData, postSchema } from "../../../utils/validation";

interface PostFormProps {
  defaultValues?: PostFormData;
  onSubmit: (data: PostFormData) => Promise<void>;
  error?: string;
  backUrl?: string;
  isEdit?: boolean;
}

export const PostForm: React.FC<PostFormProps> = React.memo(({ 
  defaultValues, 
  onSubmit, 
  error, 
  backUrl,
  isEdit = false 
}) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    getValues,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  const onFormSubmit = useCallback(async (data: PostFormData) => {
    setIsSubmittingForm(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmittingForm(false);
    }
  }, [onSubmit]);

  const hasFormData = () => {
    const values = getValues();
    return values.title?.trim() !== '' || values.content?.trim() !== '';
  };

  const handleRouteChange = (url: string) => {
    if (isDirty && hasFormData() && !isSubmittingForm && !isNavigating) {
      setTargetPath(url);
      setShowModal(true);
      throw 'Abort route change';
    }
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, isDirty, isSubmittingForm, isNavigating]);

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setTargetPath(null);
  };

  const handleModalLeave = () => {
    setIsNavigating(true);
    setShowModal(false);
    if (targetPath) {
      router.push(targetPath);
    }
  };

  return (
    <div className={classNames(
      "max-w-2xl mx-auto px-4 py-8"
    )}>
      <div className={classNames(
        "bg-white rounded-lg shadow-md p-6"
      )}>
        <h1 className={classNames(
          "text-2xl font-bold mb-6 text-gray-800"
        )}>
          {isEdit ? 'Edit Post' : 'Create New Post'}
        </h1>

        <form onSubmit={handleSubmit(onFormSubmit)} className={classNames(
          "space-y-6"
        )}>
          {error && <ErrorMessage message={error} />}
          
          <div className={classNames(
            "space-y-4"
          )}>
            <Input
              name="title"
              placeholder="Enter post title"
              register={register}
              error={errors.title?.message}
            />
            
            <Input
              name="content"
              placeholder="Write your post content here..."
              register={register}
              error={errors.content?.message}
              multiline
              rows={8}
            />
          </div>

          <div className={classNames(
            "flex justify-end space-x-4 pt-4 border-t border-gray-200"
          )}>
            <Button
              type="button"
              variant="secondary"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : isEdit ? 'Edit' : 'Create Post'}
            </Button>
          </div>
        </form>

        <UnsavedChangesModal
          isOpen={showModal}
          onClose={handleModalClose}
          onLeave={handleModalLeave}
        />
      </div>
    </div>
  );
});
