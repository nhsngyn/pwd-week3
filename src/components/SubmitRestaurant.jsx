/* src/components/SubmitRestaurant.jsx */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';
// 1. apiClient (axios 인스턴스)를 불러옵니다.
import apiClient from '../services/api';

// --- (스타일 컴포넌트는 이전과 동일하여 생략합니다) ---
const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ErrorMessage = styled.span`
  color: #ff4757;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 3rem;
  
  svg {
    font-size: 4rem;
    color: #4caf50;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #4caf50;
    margin-bottom: 1rem;
  }
`;


function SubmitRestaurant() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  // 2. onSubmit 함수를 수정합니다.
  const onSubmit = async (data) => {
    // 'data' 파라미터: react-hook-form이 폼 데이터를 객체 형태로 넘겨줍니다.
    try {
      // apiClient.post를 사용해 백엔드로 데이터를 전송합니다.
      await apiClient.post('/submissions', data);
      
      setSubmitted(true);
      toast.success('맛집이 성공적으로 제보되었습니다! 🎉');
      reset();
      setTimeout(() => setSubmitted(false), 5000);

    } catch (error) {
      console.error("제출 에러:", error);
      toast.error('제출 중 오류가 발생했습니다.');
    }
  };

  if (submitted) {
    return (
      <FormContainer>
        <SuccessMessage>
          <FaCheckCircle />
          <h3>제보 감사합니다!</h3>
          <p>여러분의 제보로 캠퍼스 푸드맵이 더욱 풍성해집니다.</p>
          <button onClick={() => setSubmitted(false)}>
            다른 맛집 제보하기
          </button>
        </SuccessMessage>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <FormTitle>🍽️ 새로운 맛집 제보하기</FormTitle>
      
      {/* 3. JSX 부분은 수정할 필요가 없습니다. */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="name">맛집 이름 *</Label>
          <Input
            id="name"
            {...register("name", {
              required: "맛집 이름은 필수입니다"
            })}
            placeholder="예: OO식당"
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">카테고리 *</Label>
          <Select
            id="category"
            {...register("category", {
              required: "카테고리를 선택해주세요"
            })}
          >
            <option value="">선택하세요</option>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="양식">양식</option>
            <option value="아시안">아시안</option>
            <option value="분식">분식</option>
            <option value="카페">카페</option>
            <option value="기타">기타</option>
          </Select>
          {errors.category && (
            <ErrorMessage>{errors.category.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="address">위치 *</Label>
          <Input
            id="address"
            {...register("address", {
              required: "위치는 필수입니다"
            })}
            placeholder="예: 아주대학교 정문 도보 5분"
          />
          {errors.address && (
            <ErrorMessage>{errors.address.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="priceRange">가격대</Label>
          <Input
            id="priceRange"
            {...register("priceRange")}
            placeholder="예: 8,000-12,000원"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="menu">추천 메뉴</Label>
          <Textarea
            id="menu"
            {...register("menu")}
            placeholder="예: 치즈닭갈비, 막국수, 볶음밥"
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? '제출 중...' : '맛집 제보하기'}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}

export default SubmitRestaurant;